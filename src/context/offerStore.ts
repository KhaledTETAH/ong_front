import { create } from "zustand";
import axios from "axios";
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1').replace(/\/$/, '');

export interface SearchParams {
  q?: string;
  country?: string;
  city?: string;

}

export interface Compatibility {
  score: number;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  compatibility?: Compatibility;
  saved: boolean;
  applied: boolean;
  period?: string;
  hours?: string;
  org?: string;
  location?: string;
  skills?: string[];
  verified?: boolean;
  hasAttestation?: boolean;
}

interface OfferState {
  offers: Offer[];
  candidateOffers: Offer[];
  offer: Offer | null;

  loading: boolean;

  filters: SearchParams;
  //condidateOffers:Offer[];

  setOffer: (offer: Offer) => void;
  setOffers: (offers: Offer[]) => void;
  setCandidateOffers: (offers: Offer[]) => void;

  setFilters: (filters: Partial<SearchParams>) => void;

  clearFilters: () => void;

  searchOffers: () => Promise<void>;
  //setCondidateOffers:(condidateOffers:Offer[])=>void;

}

export const useOfferStore = create<OfferState>((set, get) => ({

  offers: [],

  candidateOffers: [],

  offer: null,

  loading: false,

  filters: {},

  setOffer: (offer) =>
    set({
      offer,
    }),

  setOffers: (offers) =>
    set({
      offers,
    }),

  setCandidateOffers: (candidateOffers) =>
    set({
      candidateOffers,
    }),

  setFilters: (newFilters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    })),

  clearFilters: () =>
    set({
      filters: {},
    }),

  searchOffers: async () => {

    set({
      loading: true,
    });

    try {
console.log("resppppponse", get().filters)//just for debugging 
      const response = await axios.get(`${API_BASE_URL}/offers/`, {
        params: get().filters,
      });

      set({
        offers: response.data.data,
        loading: false,
      });

    } catch (error) {

      console.error(error);

      set({
        loading: false,
      });

    }

  },

}));