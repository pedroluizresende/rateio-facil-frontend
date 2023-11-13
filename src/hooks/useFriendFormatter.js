function useFriendFormatter() {
  const getFriendsName = (orders) => {
    const friendArr = orders.map((o) => o.friend);
    const uniqueFriends = [...new Set(friendArr)];

    return uniqueFriends;
  };

  const getFriendOrders = (orders, friend) => {
    const orderUser = orders.filter((o) => o.friend === friend);

    return orderUser;
  };

  return {
    getFriendsName,
    getFriendOrders,
  };
}

export default useFriendFormatter;
