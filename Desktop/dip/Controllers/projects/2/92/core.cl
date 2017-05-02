void core(uint *a, uint *b, uint *c)
{                                                                           
    size_t i = getWorkerNumber(0);
    c[i] = a[i] + b[i];                                                     
}  

