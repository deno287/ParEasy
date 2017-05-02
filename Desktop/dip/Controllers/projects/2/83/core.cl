function MedianFilter(pSrc, pDst)
{
    const int x = getWorker(0); 
    const int y = getWorker(1);  
    
    const int width = getAllWorkers(0);
    const int iOffset = y * width;
    const int iPrev = iOffset - width;
    const int iNext = iOffset + width;

    uint matrix[9];
    
    // get pixels within aperture
    matrix[0] = pSrc[iPrev + x - 1];
    matrix[1] = pSrc[iPrev + x];
    matrix[2] = pSrc[iPrev + x + 1];
    matrix[3] = pSrc[iOffset + x - 1];
    matrix[4] = pSrc[iOffset + x];
    matrix[5] = pSrc[iOffset + x + 1];
    matrix[6] = pSrc[iNext + x - 1];
    matrix[7] = pSrc[iNext + x];
    matrix[8] = pSrc[iNext + x + 1];

    uint uiResult = 0;
    uint uiMask = 0xFF;
    
    for(int ch = 0; ch < 3; ch++)
    {
        // extract next color channel
        uint r0,r1,r2,r3,r4,r5,r6,r7,r8;
        r0=matrix[0]& uiMask;
        r1=matrix[1]& uiMask;
        r2=matrix[2]& uiMask;
        r3=matrix[3]& uiMask;
        r4=matrix[4]& uiMask;
        r5=matrix[5]& uiMask;
        r6=matrix[6]& uiMask;
        r7=matrix[7]& uiMask;
        r8=matrix[8]& uiMask;

        // perform partial bitonic sort to find current channel median
        uint uiMin = min(r0, r1);
        uint uiMax = max(r0, r1);
        r0 = uiMin;
        r1 = uiMax;

        uiMin = min(r3, r2);
        uiMax = max(r3, r2);
        r3 = uiMin;
        r2 = uiMax;

        uiMin = min(r2, r0);
        uiMax = max(r2, r0);
        r2 = uiMin;
        r0 = uiMax;

        uiMin = min(r3, r1);
        uiMax = max(r3, r1);
        r3 = uiMin;
        r1 = uiMax;

        uiMin = min(r1, r0);
        uiMax = max(r1, r0);
        r1 = uiMin;
        r0 = uiMax;

        uiMin = min(r3, r2);
        uiMax = max(r3, r2);
        r3 = uiMin;
        r2 = uiMax;

        uiMin = min(r5, r4);
        uiMax = max(r5, r4);
        r5 = uiMin;
        r4 = uiMax;

        uiMin = min(r7, r8);
        uiMax = max(r7, r8);
        r7 = uiMin;
        r8 = uiMax;

        uiMin = min(r6, r8);
        uiMax = max(r6, r8);
        r6 = uiMin;
        r8 = uiMax;

        uiMin = min(r6, r7);
        uiMax = max(r6, r7);
        r6 = uiMin;
        r7 = uiMax;

        uiMin = min(r4, r8);
        uiMax = max(r4, r8);
        r4 = uiMin;
        r8 = uiMax;

        uiMin = min(r4, r6);
        uiMax = max(r4, r6);
        r4 = uiMin;
        r6 = uiMax;

        uiMin = min(r5, r7);
        uiMax = max(r5, r7);
        r5 = uiMin;
        r7 = uiMax;

        uiMin = min(r4, r5);
        uiMax = max(r4, r5);
        r4 = uiMin;
        r5 = uiMax;

        uiMin = min(r6, r7);
        uiMax = max(r6, r7);
        r6 = uiMin;
        r7 = uiMax;

        uiMin = min(r0, r8);
        uiMax = max(r0, r8);
        r0 = uiMin;
        r8 = uiMax;

        r4 = max(r0, r4);
        r5 = max(r1, r5);

        r6 = max(r2, r6);
        r7 = max(r3, r7);

        r4 = min(r4, r6);
        r5 = min(r5, r7);

        // store found median into result
        uiResult |= min(r4, r5);

        // update channel mask
        uiMask <<= 8;
    }
    
    // store result into memory
    pDst[iOffset + x] = uiResult;
}

