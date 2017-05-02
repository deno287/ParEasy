__kernel void sierpinski(__global char* src, int width, int offsetx, int offsety) 
{
	int x = get_global_id(0);
	int y = get_global_id(1);
	queue_t q = get_default_queue();

	int one_third = get_global_size(0) / 3;
	int two_thirds = 2 * one_third;

	if (x >= one_third && x < two_thirds && y >= one_third && y < two_thirds) 
	{
		src[(y+offsety)*width+(x+offsetx)] = 0;
	} 
	else 
	{
		src[(y+offsety)*width+(x+offsetx)] = 255;

		if (one_third > 1 && x % one_third == 0 && y % one_third == 0) 
		{
			const size_t  grid[2] = {one_third, one_third};
			enqueue_kernel(q, 0, ndrange_2D(grid), ^{ sierpinski(src, width, x+offsetx, y+offsety); });
		}
	}
}