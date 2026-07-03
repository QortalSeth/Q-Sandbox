export const categories = [
  "Account",
  "AT",
  "Block",
  "Chat",
  "Data",
  "Group",
  "List",
  "Notification",
  "Payment",
  "Poll",
  "System",
  "Transaction",
  "Other",
];

export const actions = {
  // Payment
  ADD_FOREIGN_SERVER: {
    category: "Payment",
    isTx: false,
    requiresApproval: false, // TODO
    isGatewayDisabled: true,
  },
  CANCEL_TRADE_SELL_ORDER: {
    category: "Payment",
    isTx: true,
    requiresApproval: true,
    isGatewayDisabled: true,
  },
  CREATE_TRADE_BUY_ORDER: {
    category: "Payment",
    isTx: true,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  CREATE_TRADE_SELL_ORDER: {
    category: "Payment",
    isTx: true,
    requiresApproval: true,
    isGatewayDisabled: true,
  },
  GET_ARRR_SYNC_STATUS: {
    category: "Payment",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  GET_CROSSCHAIN_SERVER_INFO: {
    category: "Payment",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  GET_DAY_SUMMARY: {
    category: "Payment",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  GET_FOREIGN_FEE: {
    category: "Payment",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  GET_PRICE: {
    category: "Payment",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  GET_SERVER_CONNECTION_HISTORY: {
    category: "Payment",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  GET_TX_ACTIVITY_SUMMARY: {
    category: "Payment",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  MULTI_ASSET_PAYMENT_WITH_PRIVATE_DATA: {
    category: "Payment",
    isTx: true,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  REMOVE_FOREIGN_SERVER: {
    category: "Payment",
    isTx: false,
    requiresApproval: false, // TODO
    isGatewayDisabled: true,
  },
  SEND_COIN: {
    category: "Payment",
    isTx: true,
    requiresApproval: true,
    isGatewayDisabled: null,
    isGatewayDisabledExplanation: "Only QORT is permitted through gateways",
  },
  SET_CURRENT_FOREIGN_SERVER: {
    category: "Payment",
    isTx: false,
    requiresApproval: false, // TODO
    isGatewayDisabled: true,
  },
  SIGN_FOREIGN_FEES: {
    category: "Payment",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  START_CROSSCHAIN_SERVER: {
    category: "Payment",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  TRANSFER_ASSET: {
    category: "Payment",
    isTx: true,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  UPDATE_FOREIGN_FEE: {
    category: "Payment",
    isTx: false,
    requiresApproval: false, // TODO
    isGatewayDisabled: true,
  },

  // Account
  BUY_NAME: {
    category: "Account",
    isTx: true,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  CANCEL_SELL_NAME: {
    category: "Account",
    isTx: true,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  GET_ACCOUNT_DATA: {
    category: "Account",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  GET_ACCOUNT_NAMES: {
    category: "Account",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  GET_BALANCE: {
    category: "Account",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  GET_NAME_DATA: {
    category: "Account",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  GET_PRIMARY_NAME: {
    category: "Account",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  GET_USER_ACCOUNT: {
    category: "Account",
    isTx: false,
    requiresApproval: true,
    isGatewayDisabled: false,
    explanation: "",
  },
  GET_USER_WALLET: {
    category: "Account",
    isTx: false,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  GET_USER_WALLET_INFO: {
    category: "Account",
    isTx: false,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  GET_USER_WALLET_TRANSACTIONS: {
    category: "Account",
    isTx: false,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  GET_WALLET_BALANCE: {
    category: "Account",
    isTx: false,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  REGISTER_NAME: {
    category: "Account",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  SEARCH_NAMES: {
    category: "Account",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  SELL_NAME: {
    category: "Account",
    isTx: true,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  UPDATE_NAME: {
    category: "Account",
    isTx: false,
    requiresApproval: true,
    isGatewayDisabled: false,
  },

  // Poll
  CREATE_POLL: {
    category: "Poll",
    isTx: true,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  VOTE_ON_POLL: {
    category: "Poll",
    isTx: true,
    requiresApproval: true,
    isGatewayDisabled: false,
  },

  // List
  ADD_LIST_ITEMS: {
    category: "List",
    isTx: false,
    requiresApproval: true,
    isGatewayDisabled: true,
  },
  DELETE_LIST_ITEM: {
    category: "List",
    isTx: false,
    requiresApproval: true,
    isGatewayDisabled: true,
  },
  GET_LIST_ITEMS: {
    category: "List",
    isTx: false,
    requiresApproval: true,
    isGatewayDisabled: true,
  },

  // Data
  DECRYPT_AESGCM: {
    category: "Data",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  DECRYPT_DATA: {
    category: "Data",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
    explaination: "",
  },
  DECRYPT_DATA_WITH_SHARING_KEY: {
    category: "Data",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  DECRYPT_QORTAL_GROUP_DATA: {
    category: "Data",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  DELETE_HOSTED_DATA: {
    category: "Data",
    isTx: false,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  ENCRYPT_DATA: {
    category: "Data",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  ENCRYPT_DATA_WITH_SHARING_KEY: {
    category: "Data",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  ENCRYPT_QORTAL_GROUP_DATA: {
    category: "Data",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  FETCH_QDN_RESOURCE: {
    category: "Data",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  GET_HOSTED_DATA: {
    category: "Data",
    isTx: false,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  GET_QDN_RESOURCE_METADATA: {
    category: "Data",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  GET_QDN_RESOURCE_PROPERTIES: {
    category: "Data",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  GET_QDN_RESOURCE_STATUS: {
    category: "Data",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  GET_QDN_RESOURCE_URL: {
    category: "Data",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  LINK_TO_QDN_RESOURCE: {
    category: "Data",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  LIST_QDN_RESOURCES: {
    category: "Data",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  PLAY_ENCRYPTED_MEDIA: {
    category: "Data",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  PUBLISH_MULTIPLE_QDN_RESOURCES: {
    category: "Data",
    isTx: true,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  PUBLISH_QDN_RESOURCE: {
    category: "Data",
    isTx: true,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  SEARCH_QDN_RESOURCES: {
    category: "Data",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },

  // Chat
  SEARCH_CHAT_MESSAGES: {
    category: "Chat",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  SEND_CHAT_MESSAGE: {
    category: "Chat",
    isTx: true,
    txType: "Unconfirmed",
    requiresApproval: true,
    isGatewayDisabled: false,
  },

  // Group
  ADD_GROUP_ADMIN: {
    category: "Group",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  BAN_FROM_GROUP: {
    category: "Group",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  CANCEL_GROUP_BAN: {
    category: "Group",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  CANCEL_GROUP_INVITE: {
    category: "Group",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  CREATE_GROUP: {
    category: "Group",
    isTx: false,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  INVITE_TO_GROUP: {
    category: "Group",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  JOIN_GROUP: {
    category: "Group",
    isTx: true,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  KICK_FROM_GROUP: {
    category: "Group",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  LEAVE_GROUP: {
    category: "Group",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  LIST_GROUPS: {
    category: "Group",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  REENCRYPT_GROUP_KEYS: {
    category: "Group",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  REMOVE_GROUP_ADMIN: {
    category: "Group",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  UPDATE_GROUP: {
    category: "Group",
    isTx: false,
    requiresApproval: true,
    isGatewayDisabled: false,
  },

  // AT
  DEPLOY_AT: {
    category: "AT",
    isTx: true,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  GET_AT: {
    category: "AT",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  GET_AT_DATA: {
    category: "AT",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  LIST_ATS: {
    category: "AT",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },

  // Blocks
  FETCH_BLOCK: {
    category: "Block",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  FETCH_BLOCK_RANGE: {
    category: "Block",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },

  // Transactions
  SEARCH_TRANSACTIONS: {
    category: "Transaction",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },

  // System
  ADMIN_ACTION: {
    category: "System",
    isTx: false,
    requiresApproval: true,
    isGatewayDisabled: true,
  },
  GET_NODE_INFO: {
    category: "System",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  GET_NODE_STATUS: {
    category: "System",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  IS_USING_PUBLIC_NODE: {
    category: "System",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  LOCK_TAB: {
    category: "System",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  OPEN_NEW_TAB: {
    category: "System",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  SAVE_FILE: {
    category: "System",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  SESSION_PERMISSIONS: {
    category: "System",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  SHOW_ACTIONS: {
    category: "System",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  UNLOCK_TAB: {
    category: "System",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  WHICH_UI: {
    category: "System",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },

  // Notification
  NOTIFICATION_ADD: {
    category: "Notification",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  NOTIFICATION_GET: {
    category: "Notification",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  NOTIFICATION_HAS_PERMISSION: {
    category: "Notification",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  NOTIFICATION_MARK_SEEN: {
    category: "Notification",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  NOTIFICATION_PERMISSION: {
    category: "Notification",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  NOTIFICATION_REMOVE: {
    category: "Notification",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },

  // Other
  CREATE_AND_COPY_EMBED_LINK: {
    category: "Other",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  OPEN_USER_LOOKUP: {
    category: "Other",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  SHOW_PDF_READER: {
    category: "Other",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  SIGN_TRANSACTION: {
    category: "Other",
    isTx: true,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  UPDATE_SUBSCRIPTIONS: {
    category: "Other",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
};

export const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const sizeLabel = (size: number) => formatBytes(size, 0);

const minSize = 500 * 1024;
const smallSize = 1 * 1024 * 1024;
const mediumSize = 10 * 1024 * 1024;
const largeSize = 50 * 1024 * 1024;
const maxSize = 2 * 1024 * 1024 * 1024;

export const services = [
  {
    name: "ARBITRARY_DATA",
    sizeInBytes: maxSize,
    sizeLabel: sizeLabel(maxSize),
  },
  {
    name: "QCHAT_ATTACHMENT",
    sizeInBytes: smallSize,
    sizeLabel: sizeLabel(smallSize),
  },
  {
    name: "ATTACHMENT",
    sizeInBytes: largeSize,
    sizeLabel: sizeLabel(largeSize),
  },
  { name: "FILE", sizeInBytes: maxSize, sizeLabel: sizeLabel(maxSize) },
  { name: "FILES", sizeInBytes: maxSize, sizeLabel: sizeLabel(maxSize) },
  { name: "CHAIN_DATA", sizeInBytes: 239, sizeLabel: "239 Bytes" },
  {
    name: "WEBSITE",
    sizeInBytes: maxSize,
    sizeLabel: sizeLabel(maxSize),
  },
  { name: "IMAGE", sizeInBytes: mediumSize, sizeLabel: sizeLabel(mediumSize) },
  { name: "THUMBNAIL", sizeInBytes: minSize, sizeLabel: sizeLabel(minSize) },
  { name: "QCHAT_IMAGE", sizeInBytes: minSize, sizeLabel: sizeLabel(minSize) },
  { name: "VIDEO", sizeInBytes: maxSize, sizeLabel: sizeLabel(maxSize) },
  { name: "AUDIO", sizeInBytes: maxSize, sizeLabel: sizeLabel(maxSize) },
  {
    name: "QCHAT_AUDIO",
    sizeInBytes: mediumSize,
    sizeLabel: sizeLabel(mediumSize),
  },
  {
    name: "QCHAT_VOICE",
    sizeInBytes: mediumSize,
    sizeLabel: sizeLabel(mediumSize),
  },
  { name: "VOICE", sizeInBytes: mediumSize, sizeLabel: sizeLabel(mediumSize) },
  {
    name: "PODCAST",
    sizeInBytes: maxSize,
    sizeLabel: sizeLabel(maxSize),
  },
  { name: "BLOG", sizeInBytes: maxSize, sizeLabel: sizeLabel(maxSize) },
  {
    name: "BLOG_POST",
    sizeInBytes: maxSize,
    sizeLabel: sizeLabel(maxSize),
  },
  { name: "BLOG_COMMENT", sizeInBytes: minSize, sizeLabel: sizeLabel(minSize) },
  {
    name: "DOCUMENT",
    sizeInBytes: maxSize,
    sizeLabel: sizeLabel(maxSize),
  },
  { name: "LIST", sizeInBytes: maxSize, sizeLabel: sizeLabel(maxSize) },
  {
    name: "PLAYLIST",
    sizeInBytes: maxSize,
    sizeLabel: sizeLabel(maxSize),
  },
  { name: "APP", sizeInBytes: largeSize, sizeLabel: sizeLabel(largeSize) },
  {
    name: "METADATA",
    sizeInBytes: maxSize,
    sizeLabel: sizeLabel(maxSize),
  },
  { name: "JSON", sizeInBytes: 25 * 1024, sizeLabel: "25 KB" },
  { name: "GIF_REPOSITORY", sizeInBytes: 25 * 1024 * 1024, sizeLabel: "25 MB" },
  { name: "STORE", sizeInBytes: maxSize, sizeLabel: sizeLabel(maxSize) },
  {
    name: "PRODUCT",
    sizeInBytes: maxSize,
    sizeLabel: sizeLabel(maxSize),
  },
  { name: "OFFER", sizeInBytes: maxSize, sizeLabel: sizeLabel(maxSize) },
  { name: "COUPON", sizeInBytes: maxSize, sizeLabel: sizeLabel(maxSize) },
  { name: "CODE", sizeInBytes: maxSize, sizeLabel: sizeLabel(maxSize) },
  { name: "PLUGIN", sizeInBytes: maxSize, sizeLabel: sizeLabel(maxSize) },
  {
    name: "EXTENSION",
    sizeInBytes: maxSize,
    sizeLabel: sizeLabel(maxSize),
  },
  { name: "GAME", sizeInBytes: maxSize, sizeLabel: sizeLabel(maxSize) },
  { name: "ITEM", sizeInBytes: maxSize, sizeLabel: sizeLabel(maxSize) },
  { name: "NFT", sizeInBytes: maxSize, sizeLabel: sizeLabel(maxSize) },
  {
    name: "DATABASE",
    sizeInBytes: maxSize,
    sizeLabel: sizeLabel(maxSize),
  },
  {
    name: "SNAPSHOT",
    sizeInBytes: maxSize,
    sizeLabel: sizeLabel(maxSize),
  },
  { name: "COMMENT", sizeInBytes: minSize, sizeLabel: sizeLabel(minSize) },
  { name: "CHAIN_COMMENT", sizeInBytes: 239, sizeLabel: "239 B" },
  { name: "MAIL", sizeInBytes: smallSize, sizeLabel: sizeLabel(smallSize) },
  { name: "MESSAGE", sizeInBytes: smallSize, sizeLabel: sizeLabel(smallSize) },
  {
    name: "IMAGE_PRIVATE",
    sizeInBytes: mediumSize,
    sizeLabel: sizeLabel(mediumSize),
  },
  {
    name: "VOICE_PRIVATE",
    sizeInBytes: mediumSize,
    sizeLabel: sizeLabel(mediumSize),
  },
  { name: "MAIL_PRIVATE", sizeInBytes: 5 * 1024 * 1024, sizeLabel: "5 MB" },
  {
    name: "MESSAGE_PRIVATE",
    sizeInBytes: smallSize,
    sizeLabel: sizeLabel(smallSize),
  },
  {
    name: "QCHAT_ATTACHMENT_PRIVATE",
    sizeInBytes: smallSize,
    sizeLabel: sizeLabel(smallSize),
  },
  {
    name: "ATTACHMENT_PRIVATE",
    sizeInBytes: largeSize,
    sizeLabel: sizeLabel(largeSize),
  },
];

export const coins = [
  {
    name: "QORT",
  },
  {
    name: "BTC",
  },
  {
    name: "LTC",
  },
  {
    name: "DOGE",
  },
  {
    name: "DGB",
  },
  {
    name: "RVN",
  },
  {
    name: "ARRR",
  },
];

export const foreignBlockchains = [
  {
    name: "LITECOIN",
  },
  {
    name: "BITCOIN",
  },
  {
    name: "DOGECOIN",
  },
  {
    name: "DIGIBYTE",
  },
  {
    name: "RAVENCOIN",
  },
  {
    name: "PIRATECHAIN",
  },
];

export const txTypes = [
  { name: "GENESIS" },
  { name: "PAYMENT" },
  { name: "REGISTER_NAME" },
  { name: "UPDATE_NAME" },
  { name: "SELL_NAME" },
  { name: "CANCEL_SELL_NAME" },
  { name: "BUY_NAME" },
  { name: "CREATE_POLL" },
  { name: "VOTE_ON_POLL" },
  { name: "ARBITRARY" },
  { name: "ISSUE_ASSET" },
  { name: "TRANSFER_ASSET" },
  { name: "CREATE_ASSET_ORDER" },
  { name: "CANCEL_ASSET_ORDER" },
  { name: "MULTI_PAYMENT" },
  { name: "DEPLOY_AT" },
  { name: "MESSAGE" },
  { name: "CHAT" },
  { name: "PUBLICIZE" },
  { name: "AIRDROP" },
  { name: "AT" },
  { name: "CREATE_GROUP" },
  { name: "UPDATE_GROUP" },
  { name: "ADD_GROUP_ADMIN" },
  { name: "REMOVE_GROUP_ADMIN" },
  { name: "GROUP_BAN" },
  { name: "CANCEL_GROUP_BAN" },
  { name: "GROUP_KICK" },
  { name: "GROUP_INVITE" },
  { name: "CANCEL_GROUP_INVITE" },
  { name: "JOIN_GROUP" },
  { name: "LEAVE_GROUP" },
  { name: "GROUP_APPROVAL" },
  { name: "SET_GROUP" },
  { name: "UPDATE_ASSET" },
  { name: "ACCOUNT_FLAGS" },
  { name: "ENABLE_FORGING" },
  { name: "REWARD_SHARE" },
  { name: "ACCOUNT_LEVEL" },
  { name: "TRANSFER_PRIVS" },
  { name: "PRESENCE" },
];
