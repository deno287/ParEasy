void core(uint* array, uint* output){
	int id = getWorkerNumber(0);
	int pomArray[20];
    	for(int x = 0; x < 20; x++) {
      		pomArray[x] = array[x];
    	}
	int length = 4;
	int cesta = 0;
	for (int i = 0; i < length; i++){
		if (i != (id)){
			int chcem = i;
			int current = id;
			bool nemam = true;
			while (nemam){
				if (pomArray[chcem+current*4] != 0){
					cesta += pomArray[chcem+current*4];
					if (chcem == i){
						output[i+id*4] = cesta;
						cesta = 0;
						nemam = false;
						current = id;
					}
					else{
						current = chcem;
						chcem = i;
					}						
				}
				else{
					if ((chcem+1) < length){
						chcem+=1;
					}
					else{
						cesta += pomArray[0+current*4];
						current = 0;
						chcem = i;
					}
				}
			}
		}
	}	
}