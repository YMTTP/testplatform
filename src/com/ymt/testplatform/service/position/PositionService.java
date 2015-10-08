package com.ymt.testplatform.service.position;

import java.util.List;

import com.ymt.testplatform.entity.Position;


public interface PositionService {
	
	public Position findPositionById(int id);
	
	public void savePosition(Position position);

	public void updatePosition(Position position);

	public void deletePosition(Position position);

	public List<Position> findAllList(Integer pageIndex);
	
	public List<Position> findAllPositions();
	
	public Long findPages();

	

	

}
