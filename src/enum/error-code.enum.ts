export enum ErrorCodeEnum {
  PASSWORD_EXPIRED = 21201,
  PASSWORD_INCORRECT = 21202,
  FAILED_VERIFY_TOKEN = 21203,
  TOKEN_EMPTY = 21204,
  GRANT_DENIED = 21205,
  USERNAME_INCORRECT = 21206,
  USER_LOCK = 21207,

  BAD_REQUEST = 400,
  DATABASE_MISTAKE = 1001,
  REQUEST_CLASS_VALIDATE = 1002,
  CONVERT_MODEL_TO_DTO = 1003,
  CONVERT_DTO_TO_MODEL = 1004,
  ID_NOT_VALID = 1005,
  LOGIN_INVALID = 1006,
  DATA_IS_ALREADY = 1007,
  DUPLICATE_DATA = 92203,
  INVALID_DATA_LENGTH = 92204,
  NOT_FOUND = 92202,


}

export enum ErrorDescriptionEnum {
  //Auth
  PASSWORD_EXPIRED = 'รหัสผ่านหมดอายุ',
  PASSWORD_INCORRECT = 'รหัสผ่านไม่ถูกต้อง',
  FAILED_VERIFY_TOKEN = 'TOKEN ไม่ถูกต้อง',
  TOKEN_EMPTY = 'TOKEN ว่าง',
  GRANT_DENIED = 'การเข้าถึงถูกปฏิเสธ',
  USERNAME_INCORRECT = 'ชื่อผู้ใช้ไม่ถูกต้อง',
  USER_LOCK = 'ผู้ใช้งานถูกล็อค',

  //Exception
  BAD_REQUEST = 'คำขอไม่ถูกต้อง',
  NOT_FOUND = 'ไม่พบข้อมูลที่ต้องการ',
  DUPLICATE_DATA = 'ข้อมูลซ้ำกัน',
  INVALID_DATA_LENGTH = 'ข้อมูลมีความยาวของตัวอักษรไม่ถูกต้อง',
}