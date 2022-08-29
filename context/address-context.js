import { createContext, useEffect, useState, useCallback } from "react";

export const AddressesContext = createContext();

function AddressContext(props) {
  const [selected, setSelected] = useState(null);
  const [addressList, setAddressList] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [] = useState()

  const resetAddresses = useCallback(() => {
    setSelected(null);
    setAddressList([]);
  }, []);

  useEffect(() => {
    if (addressList?.length > 0) {
      if (!selected) {
        setSelected(addressList.at(-1));
      } else {
        const isFound = addressList.find((i) => i.id === selected.id);

        if (!isFound) setSelected(addressList.at(-1));
      }
    }
  }, [addressList, selected]);

  return (
    <AddressesContext.Provider
      value={{
        addressList,
        setAddressList,
        loading,
        setLoading,
        selected,
        setSelected,
        resetAddresses,
      }}
    >
      {props.children}
    </AddressesContext.Provider>
  );
}

export default AddressContext;
