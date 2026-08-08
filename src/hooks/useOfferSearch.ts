import {useOfferStore} from "../context/offerStore";
export const useOfferSearch = () => {

    const {
        offers,
        loading,
        searchOffers,
        setFilters
    } = useOfferStore();

    return {
        offers,
        loading,
        searchOffers,setFilters
    };

}