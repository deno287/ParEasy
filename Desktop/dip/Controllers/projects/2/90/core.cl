function sort_sel(input, output){
	  int i = getWorker(0);
	  int n = getAllWorkers(0); 	  
	  uint* iKey = input[i];
	  int pos = 0;
	  for (int j=0;j<n;j++){
		uint* jKey = input[j];
		if ((jKey < iKey) || (jKey == iKey && j < i)){
			pos += 1;
		}
	}
	output[pos] = iKey;
}

