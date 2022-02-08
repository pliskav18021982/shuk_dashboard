import axios from 'axios';


export const fetch = (url, params, currentPage, orderArray, itemArray, totalNumber, setOrderArray, setItemArray, setTotalNumber, setLoading, setShowEndMessage, location) => {
  console.log('Fetching' , currentPage)
  let orderData;
  if (
    orderArray.length === 0 ||
    totalNumber === 0 ||
    orderArray.length < totalNumber
  ) {
    const request = axios.request({
      method: 'get',
      url,
      params,
      data: {},
    });

    request
      .then((response) => response.data)
      .then((data) => {
        // console.log(data);
        setTotalNumber(data.total_count);
        const newOrderItems = [];
        data.orderPage.items.forEach((item) => {
          if (itemArray.indexOf(item) === -1) {
            newOrderItems.push(item);
          }
        });
        const newData = [
          ...data.orderPage.orders.map(
            (order) => (order = { ...order, clicked: false }),
          ),
        ];
        if (location !== null && location.state !== null) {
          orderData = location.state.itemsString;
          console.log('orderdata', orderData);
          const orderId = location.state.orderId;
          const total = location.state.total;

          let orderEdited = orderArray.find((obj) => obj.order.id === orderId);
          let { order } = orderEdited;
          order = { ...order, total };
          orderEdited = { ...orderEdited, order, orderItemsDtos: orderData };
          console.log(orderEdited);

          const updatedIndex = orderArray.findIndex(
            (o) => o.order.id === orderId,
          );
          setItemArray([...itemArray, ...newOrderItems]);
          setOrderArray([
            ...orderArray.slice(0, updatedIndex),
            orderEdited,
            ...orderArray.slice(updatedIndex + 1),
            ...data.orderPage.orders.map(
              (order) => (order = { ...order, clicked: false }),
            ),
          ]);
          sessionStorage.setItem(
            'items',
            JSON.stringify([...itemArray, ...newOrderItems]),
          );
          sessionStorage.setItem(
            'orders',
            JSON.stringify([
              ...orderArray.slice(0, updatedIndex),
              orderEdited,
              ...orderArray.slice(updatedIndex + 1),
              ...data.orderPage.orders.map(
                (order) => (order = { ...order, clicked: false }),
              ),
            ]),
          );
        } else {
          setItemArray([...itemArray, ...newOrderItems]);
          setOrderArray([
            ...orderArray,
            ...data.orderPage.orders.map(
              (order) => (order = { ...order, clicked: false }),
            ),
          ]);
          sessionStorage.setItem(
            'items',
            JSON.stringify([...itemArray, ...newOrderItems]),
          );
          sessionStorage.setItem(
            'orders',
            JSON.stringify([...orderArray, ...newData]),
          );
        }

        sessionStorage.setItem('nextPage', currentPage + 1);
        setLoading(true);
      })
      .finally(() => {});
  } else {
    setShowEndMessage(true);
  }
};


