export function mapSubscriptionBoxSubscriptionBoxResponseDtoMapper(
  user,
  items,
  subscriptionBox,
) {
  const mappedItems = items.map((item) => ({
    id: item.id,
    itemName: item.itemName,
    price: item.price,
    category: item.category,
  }));

  return {
    id: subscriptionBox.id,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    items: mappedItems,
    total: subscriptionBox.total,
    createdAt: subscriptionBox.createdAt,
    updatedAt: subscriptionBox.updatedAt,
  };
}
