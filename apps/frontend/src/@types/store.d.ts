import {Organization} from "./orgranization";
import {Coupons, Offer} from "./offer";

interface OfferStoreProps {
  data: Offer[]
}

interface OrganizationStoreProps {
  data: Organization[]
}

interface UserStoreProps {
  isAuth: boolean
  username?: string
  organization?: Organization
  error?: string
  coupons?: Coupons[]|undefined
  roles?: string[]
}

interface StoreApplicationProps {
  isLoading: boolean
  isOpenCity: boolean
  cityList: string[]
  currentCity: string|null
}

interface StoreProps {
  user: UserStoreProps
  organization: OrganizationStoreProps
  offer: OfferStoreProps
  application?: StoreApplicationProps
}
