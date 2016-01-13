package com.ymt.testplatform.action;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

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
	private JSONObject ret = new JSONObject();

	public String createPosition(){
		
		Position pos = new Position();
		
		pos.setName(name);
		pos.setDel(0);
		
		positionService.savePosition(pos);
		ret.put("retCode", "1000");
		ret.put("retMSG", "创建职位成功");
		return "success";
	}
	
	public String deletePosition(){
		Position pos = positionService.findPositionById(positionid);
		
		if (pos == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该职位不存在");
			return "success";
		}
		
		pos.setDel(1);
		positionService.savePosition(pos);
		ret.put("retCode", "1000");
		ret.put("retMSG", "删除职位成功");
		return "success";
	}
	
	public String findPositionById(){
		Position pos = positionService.findPositionById(positionid);
		
		if (pos == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该职位不存在");
			return "success";
		}
		//this.setPosition(pos);
		ret.put("pos", pos);
		ret.put("retCode", "1000");
		ret.put("retMSG", "查询职位成功");
		return "success";
	}
	
	public String updatePosition() {
		Position pos = positionService.findPositionById(positionid);
		
		if (pos == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该职位不存在");
			return "success";
		}
		
		pos.setName(name);
		
		positionService.updatePosition(pos);
		
		ret.put("retCode", "1000");
		ret.put("retMSG", "职位更新成功");
		return "success";
	}

	public String listPositions() {	
		List<Position> poss = new ArrayList<Position>();
		poss = positionService.findAllPositions();
		JSONArray ja = JSONArray.fromObject(poss);
		ret.put("poss", ja);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
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

	public JSONObject getRet() {
		return ret;
	}

	public void setRet(JSONObject ret) {
		this.ret = ret;
	}


}
