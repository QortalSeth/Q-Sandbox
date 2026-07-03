// src/global.d.ts
// Override qapp-core's restrictive QortalRequestOptions union type
// to allow any string for the action field
interface QortalRequestOptions {
  action: string
  name?: string
  service?: string
  data64?: string
  title?: string
  description?: string
  category?: string
  tags?: string[] | string
  identifier?: string
  address?: string
  metaData?: string
  encoding?: string
  includeMetadata?: boolean
  limit?: number
  offset?: number
  reverse?: boolean
  resources?: any[]
  filename?: string
  list_name?: string
  item?: string
  items?: string[]
  tag1?: string
  tag2?: string
  tag3?: string
  tag4?: string
  tag5?: string
  coin?: string
  destinationAddress?: string
  amount?: number
  blob?: Blob
  mimeType?: string
  file?: File
  encryptedData?: string
  prefix?: boolean
  exactMatchNames?: boolean
  // Additional properties for new actions
  lockMessage?: string
  data?: string
  permissions?: string[]
  assetId?: string
  recipient?: string
  groupId?: number
  payments?: any[]
  notificationId?: string
  message?: string
  filters?: any
  link?: string
  image?: string
  notificationIds?: string[]
  user?: string
  mediaId?: string
  key?: string
  iv?: string
  location?: string
  senderPublicKey?: string
  // Foreign server properties
  type?: string | number
  host?: string
  port?: string | number
  // Group admin properties
  qortalAddress?: string
  banTime?: number
  reason?: string
  // Poll properties
  pollName?: string
  pollDescription?: string
  pollOptions?: string[]
  // Trade properties
  buyOrderId?: string
  sellOrderId?: string
  // AT properties
  atAddress?: string
  // Chat properties
  chatId?: string
  timestamp?: number
  // Name properties
  nameValue?: string
  // Group properties
  approvalThreshold?: number
  minimumBlockDelay?: number
  maximumBlockDelay?: number
  // Transaction properties
  txGroupId?: number
  reference?: string
  // Cross-chain properties
  foreignBlockchain?: string
  // Subscription properties
  subscriptions?: any[]
  // Admin action properties
  value?: string
  // Any additional properties
  [key: string]: any
}

declare function qortalRequest(options: QortalRequestOptions): Promise<any>
declare function qortalRequestWithTimeout(
  options: QortalRequestOptions,
  time: number
): Promise<any>

declare global {
  interface Window {
    _qdnBase: any // Replace 'any' with the appropriate type if you know it
    _qdnTheme: string
  }
}