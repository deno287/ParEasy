//#pragma OPENCL EXTENSION cl_khr_global_int32_base_atomics : enable
//#pragma OPENCL EXTENSION cl_khr_global_int32_extended_atomics : enable
#define MAXCOUNT 1000

//__global int front[MAXCOUNT][MAXCOUNT];
//__global int emptySlot[MAXCOUNT];
//__global int requestedSlot[MAXCOUNT];

//__global int numberOfJobs = 0;
//__global int workersWaiting = 0;
//__global bool circleFound = false;

//__global int slotLength[MAXCOUNT];

#define NUM_THREADS 14

#if 0
void lock(int i, __global uint *entering, __global uint *number) {
      entering[i] = 1;
      uint max = 0;
      for (int j = 0; j < NUM_THREADS; j++)
         if (max < number[j]) max = number[j];
      number[i] = 1 + max;
      entering[i] = 0;

      for (int j = 1; j <= NUM_THREADS; j++) {
          // Wait until thread j receives its number:
          while (entering[j]) { /* nothing */ }
          // Wait until all threads with smaller numbers or with the same
          // number, but with higher priority, finish their work:
          while ((number[j] != 0) && ( (number[j] < number[i]) || ((number[j] == number[i]) && (j < i)))) { /* nothing */ }
      }
  }

void  unlock(int i, __global uint *number) {
      number[i] = 0;
  }
#endif


void core(uint *entering, uint *number, uint *graph, uint *nodes, uint *circle, uint *emptySlot, uint *requestedSlot, uint *numberOfJobs, uint *workersWaiting, uint *slotLength, uint *front){
}


#if 0
void core(uint *entering, uint *number, uint *graph, uint *nodes, uint *circle, uint *emptySlot, uint *requestedSlot, uint *numberOfJobs, uint *workersWaiting, uint *slotLength, uint *front){

	int id = getWorkerNumber(0);
	int size = getWorkersCount(0);
	int count = *nodes;	
	int path[MAXCOUNT];
	int p_index[MAXCOUNT];
	int pathLen = 0;
	bool hasWork = false;

	if (id == 0){
		path[0] = 1;
		pathLen = 1;
		p_index[0] = 0;
		hasWork = true;
	}

	while((circle[0] == -1) && !((workersWaiting[0] == count) && (numberOfJobs[0] == count)))
        {
		
	
		if (hasWork)
                {
			if (pathLen == slotLength[id])
			{
				hasWork = false;
//                                lock(id, entering, number);
                                  //workersWaiting[0]++;
//                                unlock(id, number);
				//atomic_inc(workersWaiting);
			}

/*
			else if (pathLen != count)
                             {
				bool nextVertexIsNew = true;
				do {
					//nextVertex = graph[path[pathLen-1]][p_index[pathLen-1]];
					nextVertex = graph[(p_index[pathLen-1])+(path[pathLen-1])*count];
					if (nextVertex == 0) break;
					for (int i = 0; i < pathLen; i++)
                                        {
						if (path[i] == nextVertex)
                                                {
							nextVertexIsNew = false;
							p_index[pathLen - 1]++;
							break;
						}
					}
				} while (nextVertexIsNew);
				if (nextVertex == 0){
					pathLen--;
				}
				else
				{
					path[pathLen] = nextVertex;
					p_index[pathLen]++;
					pathLen++;
					if (emptySlot[id]){
						for (int i = 0; i < pathLen; i++)
                                                {
							front[i+id*count] = path[i];
						}
						slotLength[id] = pathLen - 1;
						emptySlot[id] = 0;
						atomic_inc(numberOfJobs[0]);
						requestedSlot[id] = 0;
						pathLen--;
					}
				}
			}
			else{ // pathLen == count
				for (int i = 0; i < count; i++)
                                {
					circle[i] = path[i];
				}
				//circleFound = true;
			}
*/
		}
/*
		else{
			for(int i=0; i < size; i++)
                        {
				int busy = atomic_xchg(requestedSlot[i], 1);
				if (busy == 0){
					hasWork = true;
					atomic_dec(workersWaiting[0]);
					for (int j = 0; j < slotLength[i]; j++)
                                        {
						path[j] = front[j+i*count];
					}
					pathLen = slotLength[i]+1;
					p_index[pathen-1] = 0;
					emptySlot[i] = true;
					atomic_dec(numberOfJobs[0]);
					break;
				}
			}
		}
*/
	}
/*
	if (id == 0)
	{
		if (!circleFound){
			circle[0] = -1;
		}
	}
*/
}
#endif


