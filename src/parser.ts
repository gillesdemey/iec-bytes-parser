// IEC Sizes.
// kibis of bits
enum IECByteSizes {
  Byte = 1,
  KiByte = Byte * 1024,
  MiByte = KiByte * 1024,
  GiByte = MiByte * 1024,
  TiByte = GiByte * 1024,
  PiByte = TiByte * 1024,
  EiByte = PiByte * 1024,
}

// SI Sizes.
enum SIByteSizes {
  IByte = 1,
  KByte = IByte * 1000,
  MByte = KByte * 1000,
  GByte = MByte * 1000,
  TByte = GByte * 1000,
  PByte = TByte * 1000,
  EByte = PByte * 1000,
}

const bytesSizeMap = new Map<string, IECByteSizes | SIByteSizes>([
  ['kib', IECByteSizes.KiByte],
  ['kb', SIByteSizes.KByte],
  ['mib', IECByteSizes.MiByte],
  ['mb', SIByteSizes.MByte],
  ['gib', IECByteSizes.GiByte],
  ['gb', SIByteSizes.GByte],
  ['tib', IECByteSizes.TiByte],
  ['tb', SIByteSizes.TByte],
  ['pib', IECByteSizes.PiByte],
  ['pb', SIByteSizes.PByte],
  ['eib', IECByteSizes.EiByte],
  ['eb', SIByteSizes.EByte],
  // without suffixes
  ['ki', IECByteSizes.KiByte],
  ['k', SIByteSizes.KByte],
  ['mi', IECByteSizes.MiByte],
  ['m', SIByteSizes.MByte],
  ['gi', IECByteSizes.GiByte],
  ['g', SIByteSizes.GByte],
  ['ti', IECByteSizes.TiByte],
  ['t', SIByteSizes.TByte],
  ['pi', IECByteSizes.PiByte],
  ['p', SIByteSizes.PByte],
  ['ei', IECByteSizes.EiByte],
  ['e', SIByteSizes.EByte],
  // keep these last because they will match previous suffixes
  ['b', IECByteSizes.Byte],
  ['', IECByteSizes.Byte],
])

// parseBytes parses a string representation of bytes into the number
// of bytes it represents.
//
// parseBytes("42 MB") -> 42000000
// parseBytes("42 mib") -> 44040192
export function parseBytes (input: string) {
  // remove thousand (,) notation
  const normalizedInput = input.replace(/,/g, '').trim().toLowerCase()
  const suffixes = Array.from(bytesSizeMap.keys())

  const unit = suffixes.find(suffix => {
    return normalizedInput.endsWith(suffix)
  })

  if (unit === undefined) {
    throw new Error(`No such unit: ${unit}`)
  }

  const numPart = normalizedInput.replace(unit, '').trim()
  const num = parseFloat(numPart)

  const multiplier = bytesSizeMap.get(unit)
  if (!multiplier) {
    throw new Error(`No multiplier for unit: ${unit}`)
  }

  return num * multiplier
}
