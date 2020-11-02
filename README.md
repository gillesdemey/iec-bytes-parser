# iec-bytes-parser

## Installation

`yarn add iec-bytes-parser`

## Usage

```javascript
import { parseBytes } from 'iec-bytes-parser'

parseBytes("42 MB") // -> 42000000
parseBytes("42 mib") // -> 44040192
```
