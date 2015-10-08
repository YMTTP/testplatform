package com.ymt.testplatform.service.position.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ymt.testplatform.dao.BaseDAO;
import com.ymt.testplatform.entity.Position;
import com.ymt.testplatform.service.position.PositionService;


@Service("positionService")
public class PositionServiceImpl implements PositionService {

	@Resource
	private BaseDAO<Position> positionDAO;

	@Override
	public Position findPositionById(int id){
		return positionDAO.get("from Position where id = ? and del=0", new Object[] { id });
	}
	
	@Override
	public void savePosition(Position position) {
		positionDAO.save(position);
	}

	@Override
	public void updatePosition(Position position) {
		positionDAO.update(position);
	}

	@Override
	public void deletePosition(Position position) {
		positionDAO.delete(position);
	}

	@Override
	public List<Position> findAllList(Integer pageIndex) {
		return positionDAO.findByHql("from Position where del = 0", null, 20, pageIndex);
	}
	
	@Override
	public List<Position> findAllPositions(){
		return positionDAO.find("from Position where del = 0");
	}
	
	@Override
	public Long findPages(){
		String hql = "select count(*) from Position where del = 0 ";
		Long pages = positionDAO.count(hql);
		return pages;
	}
	


	

}
