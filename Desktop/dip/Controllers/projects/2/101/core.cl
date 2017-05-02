void core(uint *A, uint *B){
    int worker = getWorkerNumber(0);
    B[worker] = A[worker];
}

