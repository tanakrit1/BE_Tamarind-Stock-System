
// export class SearchMasterEmployeeRequestVm extends LeaveTransactionDto {
//     static async validate(requestObj: SearchLeaveTransactionRequestVm): Promise<void> {
//       requestObj = plainToInstance(SearchLeaveTransactionRequestVm, requestObj);
//       const errors = await validate(requestObj);
//       const extractedErrors = extractClassValidatorErrors(errors);
//       if (!_.isEmpty(extractedErrors)) {
//         throw new BadRequestException(null, extractedErrors);
//       }
//     }
//     static convertToDto(requestObj: SearchLeaveTransactionRequestVm): LeaveTransactionDto {
//       try {
//         const responseObj = plainToInstance(LeaveTransactionDto, requestObj);
//         return plainToInstance(LeaveTransactionDto, {
//           ...requestObj,
//           ...responseObj,
//         });
//       } catch (error) {
//         throw new BadRequestException(null, error.errors);
//       }
//     }
//   }