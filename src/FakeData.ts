export const fakeDelegateData = [
  {
    safeAddress: '0xSafeAddress1',
    delegates: [
      { delegate: '0xabcd', delegator: '0x1234' },
      { delegate: '0xef01', delegator: '0x5678' },
    ],
  },
  {
    safeAddress: '0xSafeAddress2',
    delegates: [
      { delegate: '0x1234', delegator: '0x9abc' },
      { delegate: '0x5678', delegator: '0xdef0' },
    ],
  },
]

export const fakeSafesOfOwner = [
  '0x493132b20De7b3e7825238414c204f8f30b17C7D',
  '0x6fa4ef12fA2Fea9e4eBD7E46C0Ffff8bfEF1a0F8',
]

export const testUsdt = '0x7169D38820dfd117C3FA1f22a697dBA58d90BA06'

export const trxInput = {
  to: testUsdt,
  value: 1,
  data: '0x',
  operation: 0,
  safeTxGas: 0,
  baseGas: 0,
  gasPrice: 0,
  gasToken: '0x0000000000000000000000000000000000000000',
  refundReceiver: '0x0000000000000000000000000000000000000000',
}

export const fakeSafeOwnerData = [
  { owner: '0xabcd', safeAddress: '0x1234', threshold: 3 },
  { owner: '0xbcde', safeAddress: '0x2345', threshold: 2 },
  { owner: '0xcdef', safeAddress: '0x3456', threshold: 4 },
  { owner: '0xdef0', safeAddress: '0x4567', threshold: 1 },
  { owner: '0xef01', safeAddress: '0x5678', threshold: 5 },
]

export const fakeSafeDetails = [
  {
    address: '0xSafeAddress1',
    nonce: 0,
    threshold: 2,
    owners: ['0xOwner1', '0xOwner2'],
    masterCopy: '0xMasterCopy1',
    modules: ['0xModule1', '0xModule2'],
    fallbackHandler: '0xFallbackHandler1',
    guard: '0xGuard1',
    version: '1.0.1',
  },
  {
    address: '0xSafeAddress2',
    nonce: 1,
    threshold: 3,
    owners: ['0xOwner3', '0xOwner4', '0xOwner5'],
    masterCopy: '0xMasterCopy2',
    modules: ['0xModule3'],
    fallbackHandler: '0xFallbackHandler2',
    guard: '0xGuard2',
    version: '1.2.0',
  },
  {
    address: '0xSafeAddress3',
    nonce: 2,
    threshold: 1,
    owners: ['0xOwner6'],
    masterCopy: '0xMasterCopy3',
    modules: ['0xModule4', '0xModule5', '0xModule6'],
    fallbackHandler: '0xFallbackHandler3',
    guard: '0xGuard3',
    version: '2.0.0',
  },
]
