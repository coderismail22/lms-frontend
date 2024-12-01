export type TFullPopulatedOrder = {
  _id: string;
  userId: string;
  paymentId: {
    _id: string;
    userId: string;
    batchId: {
      _id: string;
      batchName: string;
      courseName: string;
      courseId: string;
      couponCode: string;
      discountPrice: number;
      maxStudentNumber: number;
      batchImg: string;
      trainers: string[];
      startDate: string;
      endDate: string;
      createdAt: string;
      updatedAt: string;
      isActive: boolean;
    };
    name: string;
    paymentMethod: string;
    paymentStatus: string;
    transactionId: string;
    amount: number;
    payerNumber: string;
    payeeNumber: string;
    createdAt: string;
    updatedAt: string;
  };
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
};
