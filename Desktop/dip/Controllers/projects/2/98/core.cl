void core(uint *A, uint *B, uint *C){
    int worker = getWorkerNumber(0);
    C[worker] = A[worker] + B[worker];
}

