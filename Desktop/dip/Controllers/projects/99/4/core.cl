void core(uint *entering, uint *number, uint *graph, uint *nodes, uint *circle, uint *emptySlot, uint *requestedSlot, uint *numberOfJobs, uint *workersWaiting, uint *slotLength, uint *front)
{



}

int lock(int i, uint *entering, uint *number) {
      	entering[i] = 1;
      	uint max = 0;
      	for (int j = 0; j < 14; j++)
	{
         	if (max < number[j]) max = number[j];
	}
      	number[i] = 1 + max;
      	entering[i] = 0;

      	for (int j = 1; j <= 14; j++) 
	{
          	while (entering[j]) 
		{ 
			/* nothing */ 
		}
         	while ((number[j] != 0) && ( (number[j] < number[i]) || ((number[j] == number[i]) && (j < i)))) 
		{ 
			/* nothing */
		}
      	}
	return 1;
}

int  unlock(int i, uint *number) {
	number[i] = 0;
	return 0;
}
