function useFriendFormatter() {
  const getFriendsName = (orders) => {
    const filterArray = orders.filter((o) => o.friend !== user.name);

    const friendArr = filterArray.map((o) => o.friend);
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
