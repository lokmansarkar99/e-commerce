import {createAddress, getAddresses, getAddressById, deleteAddress, setDefaultAddress} from "../services/addressService.js";

export const addAddressController = async (req, res) => {
  const userId = req.user.id;
  const data = req.body;
  const address = await createAddress(userId, data);
  res.status(201).json(address);
};

export const getUserAddressesController = async (req, res) => {
  const userId = req.user.id;
  const addresses = await getAddresses(userId);
  res.json(addresses);
};

export const getAddressByIdController = async (req, res) => {
  const address = await getAddressById(req.params.id);
  res.json(address);
};

export const updateAddressController = async (req, res) => {
  const updated = await updateAddress(req.params.id, req.body);
  res.json(updated);
};

export const deleteAddressController = async (req, res) => {
  await deleteAddress(req.params.id);
  res.json({ message: "Address deleted" });
};

export const setDefaultAddressController = async (req, res) => {
  const userId = req.user.id;
  const addressId = parseInt(req.params.id);
  await setDefaultAddress(userId, addressId);
  res.json({ message: "Default address set" });
};
