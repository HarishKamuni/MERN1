const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    pic: {
      type: String,
      default:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAB+CAMAAADV/VW6AAAAY1BMVEX///8AAAD7+/u2trYEBATW1tbm5ub39/cnJye8vLzQ0NBjY2OQkJDg4OA/Pz+Dg4NWVlZubm7ExMR4eHgWFhadnZ2jo6Px8fFeXl4ODg5NTU0tLS2pqamwsLBEREQ5OTkfHx+sd2EhAAACzklEQVRoge2ZiZLiIBBAAYHcIdcYdRz1/79yISROxhxrlGZqa/tVTZUa46Pp5ghDCIIgCIIgCIIgCIL817DFN77kgah2u0oE3hvACGvjOm+opsnruGU+/VoWJ3REEvv0syDtvZz3L9LAm56xmk6omSd/Z+c/5dyXX0s+OD0+Bn+k/MODnQRENt8p/w6f00aCl58u8EBp14yeUxUA17/58Syc1p0lzCDdPfslO6V7aLcOv1zWJ9B6XXqXZX0OP/TkYuop/ZTg+uXK81J7v6xvr8v6aws/8RTL+sLDrJ8u61NgtYmuMuvbdNI1H1UEftfVHmZWnG7NSVoGvOiaNSUyq+s0+iONCPiWy/x8OdltdB+UnR28+pg8zdXdSRIv+21GRPiQfv0uFJ3by4ZPFFbK6bD1KIQPr8HkN1PDYLODUGU+0j40QIti9Tl0/aeK7We+MOObyUiVh0OpIskI9ICfNGDc1V6f8BCLSbjnpP8u91hbEZ1TVdcqPUeinVwGs5sxl51Le7RhafLynDGbC1B7N76rOhxN9j1hXQ3XAf0k+LoMXuvm91ZcvgLo3heJXWb4KPDuTdeeBHDhMZlN+XSrwUcveAqVf51VMbfPedzzCJipgDGRz25yx3Z9MRcQekaqkM50/WP0et9TQXR/fB2qbFHeX7zGbs3dmcqtH2N/id783TLisgD1L8lkPe0/CyCRjvXqOffQAuVWHw1d+5RcE7ksP1k8b7dfLFyes6SjuJ4K3unDtsy3ZN62IXcX/p6ujPalLnB2xsg2B9+F76r2Yjp3iLwqN193NfepraFblAO1Xr3a04ZBd49fP/C3TpZeMffvgyf8jZutz24IZ4vcfH3nRL9ykLeOg5lHJ++wOXZq7zi8r9dcun3sdujJwbIXsJUj7HVuLlY9dntVf3zfrp/cot2LRO+feuinqtdvfuNWBEEQBEEQBEEQBPmn+AO8aBhGgil0xwAAAABJRU5ErkJggg==',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const User = mongoose.model('User', userSchema);
module.exports = User;
