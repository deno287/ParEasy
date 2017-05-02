void core(uint *a, uint*b, uint *len)
{
    int size = 1;
    int index = getWorkerNumber(0) * 2;
    int i = 0;
	
    while(size < *len) {
      barrier();
      if((index + size) < *len) {
        i = (index + size) + (((index + (size * 2)) > *len) ? *len - (index + size) : size);
        merge(a + index, size, a + index + size, ((index + (size * 2)) > *len) ? *len - (index + size) : size, b + index);
      } 
	  else {
        return;
      }
	  
      size *= 2;
      cpy(&a[index], &b[index], size);
      if(index%(2*size) != 0) {
        return;
      }
    }
    *len = i;
  }

int merge(const int *arr1, int arr1size, const int *arr2, int arr2size, int *out) {
    int x = 0;
    int y = 0;
    int n = 0;
    while(x < arr1size && y < arr2size) {
        if(arr1[x] < arr2[y]) {
          out[n] = arr1[x];
          n++,x++;
        } else {
          out[n] = arr2[y];
          n++,y++;
        }
    }
    while(x<arr1size){
        out[n] = arr1[x];
        n++, x++;
    }
    while(y<arr2size){
        out[n] = arr2[y];
        n++, y++;
    }
    //return (x + y) - (arr1size + arr2size); 
    
  }
  
  
int cpy(int *out, const int *in, int size) {
	int x = 0;
    for(x = 0; x < size; x++) {
      out[x] = in[x];
    }
    return 1;
 }