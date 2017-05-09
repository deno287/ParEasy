void core(uint *A, uint *B)
{
    int x = getWorkerNumber(0); 
 
    int value = 0;
    for (int k = 0; k < 3; k++)
    {
        int elementA = A[k];
        int elementB = B[k];
        value += elementA * elementB;
    }

    C[y * 3 + x] = value;

}

