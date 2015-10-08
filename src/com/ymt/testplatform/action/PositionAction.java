package com.ymt.testplatform.action;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;
import com.ymt.testplatform.entity.Position;
import com.ymt.testplatform.service.position.PositionService;


@Controller
public class PositionAction extends ActionSupport {

	private static final long serialVersionUID = 1L;

	@Resource
	private PositionService positionService;

	private Integer positionid;
	private Position position;
	private String name;
	private List<Position> positions;
	private String retCode;
	private String retMSG;

	public String createPosition(){
		
		Position pos = new Position();
		
		pos.setName(name);
		pos.setDel(0);
		
		positionService.savePosition(pos);
		this.setRetMSG("创建职位成功");
		this.setRetCode("1000");
		return "success";
	}
	
	public String deletePosition(){
		Position pos = positionService.findPositionById(positionid);
		
		if (pos == null) {
			this.setRetMSG("该职位不存在");
			this.setRetCode("1001");
			return "success";
		}
		
		pos.setDel(1);
		positionService.savePosition(pos);
		this.setRetMSG("删除职位成功");
		this.setRetCode("1000");
		return "success";
	}
	
	public String findPositionById(){
		Position pos = positionService.findPositionById(positionid);
		
		if (pos == null) {
			this.setRetMSG("该职位不存在");
			this.setRetCode("1001");
			return "success";
		}
		this.setPosition(pos);
		this.setRetMSG("查询职位成功");
		this.setRetCode("1000");
		return "success";
	}
	
	public String updatePosition() {
		Position pos = positionService.findPositionById(positionid);
		
		if (pos == null) {
			this.setRetMSG("该职位不存在");
			this.setRetCode("1001");
			return "success";
		}
		
		pos.setName(name);
		
		positionService.updatePosition(pos);
		
		this.setRetMSG("职位更新成功");
		this.setRetCode("1000");
		return "success";
	}

	public String listPositions() {	
		List<Position> poss = new ArrayList<Position>();
		poss = positionService.findAllPositions();
		this.setPositions(poss);
		this.setRetMSG("操作成功");
		this.setRetCode("1000");
		return "success";
	}

	public String getRetMSG() {
		return retMSG;
	}

	public void setRetMSG(String retMSG) {
		this.retMSG = retMSG;
	}

	public String getRetCode() {
		return retCode;
	}

	public void setRetCode(String retCode) {
		this.retCode = retCode;
	}

	public Integer getPositionid() {
		return positionid;
	}

	public void setPositionid(Integer positionid) {
		this.positionid = positionid;
	}

	public Position getPosition() {
		return position;
	}

	public void setPosition(Position position) {
		this.position = position;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Position> getPositions() {
		return positions;
	}

	public void setPositions(List<Position> positions) {
		this.positions = positions;
	}


}
