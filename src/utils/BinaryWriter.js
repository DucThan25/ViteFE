export default function BinaryWriter (p_Endianness, p_Encoding) {
  // Instantiate the buffer
  this.ByteBuffer = new Buffer(0);

  // Set the endianness
  this.Endianness = p_Endianness || 'big';

  // Set the encoding
  this.Encoding = p_Encoding || 'ascii';

  // Set the length to 0
  this.Length = 0;
};

BinaryWriter.prototype = {
  WriteUInt8: function(p_Value) {
    var s_TempBuffer = new Buffer(1);
    s_TempBuffer.writeUInt8(p_Value, 0);
    this.Length += 1;
    this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
  },

  WriteUInt16: function(p_Value) {
    var s_TempBuffer = new Buffer(2);
    if (this.Endianness == 'little') {
      s_TempBuffer.writeUInt16LE(p_Value, 0);
    } else {
      s_TempBuffer.writeUInt16BE(p_Value, 0);
    }
    this.Length += 2;
    this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
  },

  WriteUInt32: function(p_Value) {
    var s_TempBuffer = new Buffer(4);
    if (this.Endianness == 'little') {
      s_TempBuffer.writeUInt32LE(p_Value, 0);
    } else {
      s_TempBuffer.writeUInt32BE(p_Value, 0);
    }
    this.Length += 4;
    this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
  },
  WriteInt64: function(p_Value) {
    var s_TempBuffer = new Buffer(8);
    if (this.Endianness == 'little') {
      s_TempBuffer.writeUInt32LE(p_Value, 0);
    } else {
      s_TempBuffer.writeUInt32BE(p_Value, 0);
    }
    this.Length += 8;
    this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
  },

  WriteInt8: function(p_Value) {
    var s_TempBuffer = new Buffer(1);
    s_TempBuffer.writeInt8(p_Value, 0);
    this.Length += 1;
    this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
  },

  WriteInt16: function(p_Value) {
    var s_TempBuffer = new Buffer(2);
    if (this.Endianness == 'little') {
      s_TempBuffer.writeInt16LE(p_Value, 0);
    } else {
      s_TempBuffer.writeInt16BE(p_Value, 0);
    }
    this.Length += 2;
    this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
  },

  WriteInt32: function(p_Value) {
    var s_TempBuffer = new Buffer(4);
    if (this.Endianness == 'little') {
      s_TempBuffer.writeInt32LE(p_Value, 0);
    } else {
      s_TempBuffer.writeInt32BE(p_Value, 0);
    }
    this.Length += 4;
    this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
  },

  WriteFloat: function(p_Value) {
    var s_TempBuffer = new Buffer(4);
    if (this.Endianness == 'little') {
      s_TempBuffer.writeFloatLE(p_Value, 0);
    } else {
      s_TempBuffer.writeFloatBE(p_Value, 0);
    }
    this.Length += 4;
    this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
  },

  WriteDouble: function(p_Value) {
    var s_TempBuffer = new Buffer(8);
    if (this.Endianness == 'little') {
      s_TempBuffer.writeDoubleLE(p_Value, 0);
    } else {
      s_TempBuffer.writeDoubleBE(p_Value, 0);
    }
    this.Length += 8;
    this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
  },

  WriteBytes: function(p_Value) {

    if (typeof p_Value == 'string') {
      // Ugly hack
      var s_BytesArray = [];

      for (var i = 0; i < p_Value.length; ++i) {
        s_BytesArray.push(p_Value.charCodeAt(i));
      }

      p_Value = s_BytesArray;
    }

    if (!p_Value instanceof Buffer && !p_Value instanceof Array) {
      throw new Error("Invalid Buffer object provided.");
    }

    var s_TempBuffer = (p_Value instanceof Buffer) ? p_Value : new Buffer(p_Value);

    this.Length += s_TempBuffer.length;
    this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
  }
};
