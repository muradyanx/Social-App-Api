import { required } from '@/common/config/env-validation';

export default {
  port: required('PORT'),
  nodeEnv: required('NODE_ENV'),
};
