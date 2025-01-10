export enum Role {
  USER = 0,
  ADMIN = 1,
  SUPPER_ADMIN = 2,
}

export enum Step {
  STEP_0 = 0,
  STEP_1 = 1,
  STEP_2 = 2,
  STEP_3 = 3,
  STEP_4 = 4,
  STEP_5 = 5,
  STEP_6 = 6,
}

export enum KycStatus {
  INIT = 0,
  PENDING = 1,
  VERIFIED = 2,
  FAIL = 3,
}

export enum UserStatus {
  PENDING = 0,
  ACTIVE = 1,
}

export enum InviteStatus {
  INVITED = 0,
  ACTIVE = 1,
  REMOVED = 2,
}

export enum EventEnum {
  TEST = "testEvent",
  SIGN_DOCS_COMPLETE = "signDocumentComplete",
  KYC_COMPLETE = "kycComplete",
  ADMIN_CONFIRMED_DOCS = "adminConfirmedDocs",
  ADMIN_REVERSED_CONFIRM_DOCS = "adminReversedConfirmDocs",
  ADMIN_REMOVED_USER = "adminRemovedUser",
  ADMIN_RESTORE_USER = "adminRestoreUser",
  ANNOUNCEMENT_RELOAD = "announcementReload",
}

export enum PrimaryStatus {
  DRAFT = 0,
  ACTIVE = 1,
  EXECUTED = 2,
}

export enum StageAdmin {
  LAUNCH_DATE = "launch date",
  MARKETING_PERIOD = "marketing period",
  BOOKS_OPEN = "books open",
  BOOKS_CLOSED = "books closed",
  ALLOCATION_SIGNING = "allocation and Signing",
  CLOSED = "closed",
}

export enum StageUser {
  INCOMING = "INCOMING",
  MARKETING = "MARKETING",
  OPEN = "OPEN",
  CLOSE = "CLOSE",
  SIGNING = "SIGNING",
}

export enum PrimaryListType {
  ON_GOING_AND_COMING_NEXT = 0,
  PAST_CAMPAIGNS = 1,
}

export enum PrimaryFundingRound {
  SEED = 0,
  PRE_SERIES_A = 1,
  SERIES_A = 2,
  SERIES_B = 3,
  SERIES_C = 4,
  SERIES_D = 5,
}

export enum SecondarySideEnum {
  BUY = 0,
  SELL = 1,
}

export enum SecondarySecurityTypeEnum {
  PREF = 0,
  EQUITY = 1,
  JKISS = 2,
  SAFE_NOTE = 3,
  CB = 4,
  WARRANT = 5,
}

export enum SecondaryOwnershipStructureEnum {
  DIRECT = 0,
  SPV = 1,
}

export enum SecondaryStageEnum {
  POSTINGS = "new_listing",
  PRICE_DROP = "price_drop",
  PRICE_CHANGE = "price_change",
  ACCEPTING_BACKUP_OFFERS = "accepting_offer",
  UNDER_CONTRACTED = "under_contracted",
}

export enum SecondaryScreen {
  NEW_LISTINGS = 0,
  ACCEPTING_BACKUP_OFFERS = 1,
  UNDER_CONTRACT = 2,
  EXECUTED = 3,
  TRASH = 4,
}

export enum SecondaryStatus {
  PENDING = 0,
  EXECUTED = 1,
}

export enum SecondaryType {
  NOTHING_DONE = 0,
  EXECUTED = 1,
}

export enum UserTypeEnum {
  INDIVIDUAL = 0,
  CORPORATE = 1,
}

export enum AnnouncementType {
  BOOKS_OPEN_TODAY = 1,
  NEW_SECONDARY_ORDER = 2,
  DEAL_COVERED = 3,
  BOOKS_CLOSE_TODAY = 4,
}

export enum EventAnnouncementType {
  GOING_LIVE = 1, // BOOKS_OPEN_TODAY
  BOOK_OPEN = 2, // BOOKS_OPEN_TODAY
  BOOK_CLOSE = 3, // BOOKS_CLOSE_TODAY
}

// #region Activity
export enum ActivitySource {
  PRIMARY = 0,
  SECONDARY = 1,
  COMPANY = 2,
}

export enum PrimaryTab {
  INTRODUCTION = "Introduction",
  SOLUTION = "Solution",
  DEAL_TERMS = "Deal Terms",
  DATAROOM = "Dataroom",
}

export enum DemandPage {
  PLACE_DEMAND = "place_demand",
  DEMAND_CONFIRMATION = "demand_confirmation",
  DEMAND_CONFIRMED = "demand_confirmed",
}

export enum BidOfferPage {
  PLACE_BID_OFFER = "place_bid_offer",
  BID_OFFER_CONFIRMATION = "bid_offer_confirmation",
}

export enum BidOfferType {
  BID = "bid",
  OFFER = "offer",
}

export enum ActivityColor {
  ORANGE = "orange",
  WHITE = "white",
  BLUE = "blue",
  PINK = "pink",
}
// #endregion Activity

export enum FileSource {
  USER_STEP_6 = "user_step_6",
  USER_STEP_6_ID = "user_step_6_id",
  USER_STEP_6_PROOF = "user_step_6_proof",
  PRIMARY = "primary",
}
