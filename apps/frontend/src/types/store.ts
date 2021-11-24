import {User} from "./user";
import {Organization} from "./orgranization";
import {Offer} from "./offer";

export interface StoreProps {
  user: User
  organization: Organization
  offer: Offer
}
