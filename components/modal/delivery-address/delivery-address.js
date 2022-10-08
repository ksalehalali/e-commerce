import React, {
    useEffect,
    useState,
    useRef,
    useCallback,
    useContext,
} from "react";
import styled from "styled-components";
// components
import { Modal, Input, Form, AutoComplete, Button } from "antd";
import FlexDiv from "components/utils/flex-div";
import Text from "components/utils/text";
import { FiSearch } from "react-icons/fi";
import * as constants from "redux/modal/constants";

// modules
import axios from "axios";
// context
import { AddressesContext } from "context/address-context";
import { useSelector } from "react-redux";

// eslint-disable-next-line import/no-webpack-loader-syntax
import useTranslation from "next-translate/useTranslation";
import GoogleMapComp from "pages/GoogleMapComp";
// eslint-disable-next-line import/no-webpack-loader-syntax

// styles
const StyledModal = styled(Modal)`
    width: 70% !important;
    .ant-modal-content {
    }
    .ant-modal-body {
        padding: 0;
    }
    .ant-modal-close-x {
        display: none;
    }
`;

const ModalHeader = styled(FlexDiv)``;
const ModalFooter = styled(FlexDiv)``;
const ModalBody = styled(FlexDiv)`
    position: relative;
`;
const MapContainer = styled.div`
    width: 100%;
    height: 600px;
`;

const Map = styled.div`
    width: 100%;
    height: 600px;
`;

const MapInputOuter = styled.div`
    height: fit-content;
    width: 50%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
`;

const StyledFormItem = styled(Form.Item)`
    margin: 0;
`;
const StyledAutoComplete = styled(AutoComplete)`
    width: 100%;
`;

let Marker = null;

function DeliveryAddressModal({ visible, onClose, toggleModal }) {
    const map = useRef();
    const searchInput = useRef();
    const [form] = Form.useForm();
    const { t } = useTranslation();

    const { setAddressList } = useContext(AddressesContext);
    const [center, setCenter] = useState({ lng: 25.3548, lat: 51.1839 });
    const [markerLngLat, setMarkerLngLat] = useState({ lng: null, lat: null });
    const [searchResult, setSearchResult] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null);

    // search input on search
    const searchPlace = useCallback(async () => {
        selectedResult !== null && setSelectedResult(null);
        const { data } = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${form.getFieldValue(
                "search"
            )}.json?access_token=pk.eyJ1IjoiaGFtdWRlc2hhaGluIiwiYSI6ImNrempnc2JzcjA2bmQyb3RhdnRxd2hsbnUifQ.OeXesE3wZ5B_V42D79rjJQ`
        );
        console.log("Search values");
        console.log(data);
        if (data?.features?.length > 0) setSearchResult(data?.features);
    }, []);
    // search inout on select
    const handleSearchOnSelect = useCallback(
        (value, options) => {
            console.log("Search Selected");
            console.log(value, options);

            setSelectedResult(options);
            setSearchResult([]);
        },
        [selectedResult]
    );

    const handleSubmitAddress = useCallback(() => {
        console.log("Submited");
        console.log(selectedResult);
        setAddressList((prev) => {
            console.log("prev", prev);
            let newArr = prev;
            newArr.push(selectedResult);
            return [...newArr];
        });
        toggleModal(
            constants.modalType_delivery_address,
            constants.modalType_delivery_address_confirm
        );
    }, [selectedResult]);

    const dataFromMap = async ({ position, positionName, data }) => {
        console.log(
            "position data",
            data.features[0].geometry.coordinates,
            data.features[0].place_name
        );
        setAddressList((prev) => {
            console.log("sttted");
            let newArr = prev;
            newArr.push({
                coordinates: data.features[0].geometry.coordinates,
                id: data.features[0].id,
                type: data.features[0],
                value: data.features[0].place_name,
            });
            return [...newArr];
        });
    };

    // useEffect(() => {
    //     if (map.current) return;
    //     map.current = new mapboxGl.Map({
    //         container: "map",
    //         style: "mapbox://styles/mapbox/streets-v11",
    //         center: [center.lat, center.lng],
    //         zoom: 8,
    //     });
    //     map.current.on("load", async function () {
    //         map.current.on("click", async function (e) {
    //             console.log("click ...");
    //             console.log(map.current);
    //             if (Marker) {
    //                 Marker.remove();
    //             }
    //             setMarkerLngLat({ lng: e.lngLat.lng, lat: e.lngLat.lat });
    //             const marker = new mapboxGl.Marker({
    //                 draggable: true,
    //             })
    //                 .setLngLat([e.lngLat.lng, e.lngLat.lat])
    //                 .addTo(map.current);
    //             Marker = marker;

    //             const { data } = await axios.get(
    //                 `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.lngLat.lng},${e.lngLat.lat}.json?language=en&access_token=pk.eyJ1IjoiaGFtdWRlc2hhaGluIiwiYSI6ImNrempnc2JzcjA2bmQyb3RhdnRxd2hsbnUifQ.OeXesE3wZ5B_V42D79rjJQ`
    //             );

    //             if (data?.features?.length > 0) {
    //                 // create name
    //                 // let name = [data?.features?.map(item => !item?.id.includes("poi") ? item?.place_name : null)].reverse().join(" ");

    //                 form.setFieldsValue({
    //                     search: data?.features[0]?.place_name,
    //                 });
    //                 setSelectedResult({
    //                     value: data?.features[0]?.place_name,
    //                     coordinates: data?.features[0]?.geometry?.coordinates,
    //                     id: data?.features[0]?.id,
    //                     type: data?.features[0]?.type,
    //                 });
    //             }
    //         });
    //     });
    // }, []);

    const renderItem = useCallback(
        (data) => ({
            value: data?.place_name,
            coordinates: data?.geometry?.coordinates,
            id: data?.id,
            type: data?.type,
        }),
        []
    );

    // search render options
    const searchOption = searchResult?.map((item) => renderItem(item));

    return (
        <StyledModal
            title={false}
            footer={false}
            destroyOnClose={true}
            visible={visible}
            onCancel={onClose}
            closeIcon={null}
        >
            <ModalHeader spaceBetween padding="0 10px" alignCenter>
                <Text as={"h2"} fontSize={22} type="primary">
                    {t("forms:newAddress.title")}
                </Text>
            </ModalHeader>
            <ModalBody height={500} id="modalBody">
                <MapInputOuter>
                    <Form form={form}>
                        <StyledFormItem name="search">
                            <StyledAutoComplete
                                open={searchResult.length > 0}
                                onSelect={handleSearchOnSelect}
                                onSearch={searchPlace}
                                prefix={<FiSearch style={{ color: "#aaa" }} />}
                                size="large"
                                placeholder={t(
                                    "forms:newAddress.searchLocation"
                                )}
                                options={searchOption}
                                onBlur={() =>
                                    searchResult !== [] && setSearchResult([])
                                }
                                getPopupContainer={() =>
                                    document.getElementById("modalBody")
                                }
                            />
                        </StyledFormItem>
                    </Form>
                </MapInputOuter>
                <MapContainer>
                    <GoogleMapComp
                        dataFromMap={dataFromMap}
                        datafromSearch={selectedResult}
                    />
                </MapContainer>
            </ModalBody>
            <ModalFooter end={true} padding="10px" alignCenter>
                <Button
                    type="primary"
                    onClick={handleSubmitAddress}
                    size="large"
                    disabled={false}
                >
                    {t("forms:newAddress.addLocation")}
                </Button>
            </ModalFooter>
        </StyledModal>
    );
}

export default DeliveryAddressModal;
