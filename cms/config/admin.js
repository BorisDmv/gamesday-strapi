module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '29a738f7e3627502a9f7f0cdbc8d9c0b'),
  },
});
