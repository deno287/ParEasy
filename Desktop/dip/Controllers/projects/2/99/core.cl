void core(uint *A, uint *B, uint*C)
{
	int worker1 = getWorkerNumber(0);
	int worker2 = getWorkerNumber(1);

	float pom = worker1/3;
	int worker_A = pom;
	int worker_B = worker1%3;

	int value = 0;
	for (int k = 0; k < 3; k++)
   	{
      		int elementA = A[k+worker_A*3];
      		int elementB = B[worker_B+k*3];
      		value += elementA * elementB;
   	}
 
   	C[worker1+worker2*3] = value;
}

