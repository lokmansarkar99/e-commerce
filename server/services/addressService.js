import  prisma  from "../controllers/prismaController.js";

export const createAddress = async (userId, data) => {
  return await prisma.address.create({
    data: { ...data, userId },
  });
};

export const getAddresses = async (userId) => {
  return await prisma.address.findMany({
    where: { userId },
    orderBy: { isDefault: 'desc' },
  });
};

export const getAddressById = async (id) => {
  return await prisma.address.findUnique({ where: { id: parseInt(id) } });
};

export const updateAddress = async (id, data) => {
  return await prisma.address.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const deleteAddress = async (id) => {
  return await prisma.address.delete({ where: { id: parseInt(id) } });
};

export const setDefaultAddress = async (userId, addressId) => {
  await prisma.address.updateMany({
    where: { userId },
    data: { isDefault: false },
  });

  await prisma.address.update({
    where: { id: addressId },
    data: { isDefault: true },
  });
};
