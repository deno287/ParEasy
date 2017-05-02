void core(uint* M, uint* R, uint* nodes)
{
    
    // M - matica najkratších ciest
    // R - matica navrhnutýh ciest
    // počet vrcholov

    // vyberám stĺpec a riadok matice
    int i = getWorkerNumber(0);
    int j = getWorkerNumber(1);
    
    // počet vrcholov
    int count = *nodes;
    
    // hľadám cesty medzi vrcholmi cez každý bod grafu
    for (int k = 0; k < count; k++){
        // ak je cesta kratšia zapíšm
        if (M[i+j*count] > M[i+k*count] + M[k+j*count]){
            // zápis do matice najkratších ciest
            //M[i+j*count] = M[i+k*count] + M[k+j*count];
            // zápis cesty
            R[i+j*count] = k+1;
        }
	barrier();
    }
}