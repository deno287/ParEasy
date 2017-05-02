void core(uint* M, uint* R, uint* nodes)
{

    int i = getWorkerNumber(0);
    int j = getWorkerNumber(1);
    
    int count = *nodes;
    
    for (int k = 0; k < count; k++){
        if (M[i+j*count] > M[i+k*count] + M[k+j*count]){
            R[i+j*count] = k+1;
        }
	barrier();
    }
}