/**
 * 态度类型
 */
export type AttitudeType = 0 | 1 | 2;
/**
 * 态度
 */
export const attitudeOptions: {
  value: AttitudeType;
  label: string;
  color: string;
}[] = [
  {
    value: 0,
    label: '友好',
    color: '#00DA6E',
  },
  {
    value: 1,
    label: '一般',
    color: '#5599FF',
  },
  {
    value: 2,
    label: '抵触',
    color: '#FF9544',
  },
];
