void core(uint *A, uint *B, uint*C)
{
    int x = getWorkerNumber(0); 
    int y = getWorkerNumber(1);
 
    int value = 0;
    for (int k = 0; k < 3; k++)
    {
        int elementA = A[y * 3 + k];
        int elementB = B[k * 3 + x];
        value += elementA * elementB;
    }

    C[y * 3 + x] = value;

}
