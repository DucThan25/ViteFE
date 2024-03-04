export default function BinaryReader (p_InputBuffer, p_Endianness, p_Encoding) {
  // Instantiate the buffer (if needed)
  if (p_InputBuffer instanceof Buffer) {
    this.ByteBuffer = new Buffer(p_InputBuffer)
  } else if (
    p_InputBuffer instanceof Array ||
    typeof p_InputBuffer === 'string'
  ) {
    this.ByteBuffer = new Buffer(p_InputBuffer, p_Encoding)
  } else {
    throw new Error(
      'Invalid buffer input for BinaryReader (' + typeof p_InputBuffer + ')'
    )
  }

  // Set the endianness
  this.Endianness = p_Endianness || 'big'

  // Set the encoding
  this.Encoding = p_Encoding || 'ascii'

  // Set the length
  this.Length = this.ByteBuffer.length

  // Set the position to 0
  this.Position = 0

  this.ReadUInt8 = () => {
    if (this.ByteBuffer.length < 1) {
      return 0
    }

    var s_Val = this.ByteBuffer.readUInt8(0)
    this.ByteBuffer = this.ByteBuffer.slice(1)
    ++this.Position
    return s_Val
  }

  this.ReadUInt16 = () => {
    if (this.ByteBuffer.length < 2) {
      return 0
    }
    var s_Val =
      this.Endianness == 'little'
        ? this.ByteBuffer.readUInt16LE(0)
        : this.ByteBuffer.readUInt16BE(0)
    this.ByteBuffer = this.ByteBuffer.slice(2)
    this.Position += 2
    return s_Val
  }

  this.ReadUInt32 = () => {
    if (this.ByteBuffer.length < 4) {
      return 0
    }

    var s_Val =
      this.Endianness == 'little'
        ? this.ByteBuffer.readUInt32LE(0)
        : this.ByteBuffer.readUInt32BE(0)
    this.ByteBuffer = this.ByteBuffer.slice(4)
    this.Position += 4
    return s_Val
  }

  this.ReadInt8 = () => {
    if (this.ByteBuffer.length < 1) {
      return 0
    }

    var s_Val = this.ByteBuffer.readInt8(0)
    this.ByteBuffer = this.ByteBuffer.slice(1)
    ++this.Position
    return s_Val
  }

  this.ReadInt16 = () => {
    if (this.ByteBuffer.length < 2) {
      return 0
    }

    var s_Val =
      this.Endianness == 'little'
        ? this.ByteBuffer.readInt16LE(0)
        : this.ByteBuffer.readInt16BE(0)
    this.ByteBuffer = this.ByteBuffer.slice(2)
    this.Position += 2
    return s_Val
  }

  this.ReadInt32 = () => {
    if (this.ByteBuffer.length < 4) {
      return 0
    }

    var s_Val =
      this.Endianness == 'little'
        ? this.ByteBuffer.readInt32LE(0)
        : this.ByteBuffer.readInt32BE(0)
    this.ByteBuffer = this.ByteBuffer.slice(4)
    this.Position += 4
    return s_Val
  }

  this.ReadInt64 = () => {
    if (this.ByteBuffer.length < 4) {
      return 0
    }
    var s_Val =
      this.Endianness == 'little'
        ? this.ByteBuffer.readUInt32LE(0)
        : this.ByteBuffer.readUInt32BE(0)
    this.ByteBuffer = this.ByteBuffer.slice(8)
    this.Position += 8
    return s_Val
  }

  this.ReadFloat = () => {
    if (this.ByteBuffer.length < 4) {
      return 0.0
    }

    var s_Val =
      this.Endianness == 'little'
        ? this.ByteBuffer.readFloatLE(0)
        : this.ByteBuffer.readFloatBE(0)
    this.ByteBuffer = this.ByteBuffer.slice(4)
    this.Position += 4
    return s_Val
  }

  this.ReadDouble = () => {
    if (this.ByteBuffer.length < 8) {
      return 0.0
    }

    var s_Val =
      this.Endianness == 'little'
        ? this.ByteBuffer.readDoubleLE(0)
        : this.ByteBuffer.readDoubleBE(0)
    this.ByteBuffer = this.ByteBuffer.slice(8)
    this.Position += 8
    return s_Val
  }

  this.ReadBytes = p_Count => {
    if (p_Count > this.ByteBuffer.length) {
      return new Buffer(0)
    }

    var s_Val = new Buffer(p_Count)
    this.ByteBuffer.copy(s_Val, 0, 0, p_Count)

    this.ByteBuffer = this.ByteBuffer.slice(p_Count)

    this.Position += p_Count
    return s_Val
  }
}
