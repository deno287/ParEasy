void core(uint *input, uint *output)
{
    unsigned int i = getWorkerNumber(0);
    output[i] = input[i] * input[i];
}