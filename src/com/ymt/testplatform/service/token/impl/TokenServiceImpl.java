package com.ymt.testplatform.service.token.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ymt.testplatform.dao.BaseDAO;
import com.ymt.testplatform.entity.Token;
import com.ymt.testplatform.service.token.TokenService;

@Service("tokenService")
public class TokenServiceImpl implements TokenService {

	@Resource
	private BaseDAO<Token> tokenDAO;
	

	@Override
	public void saveToken(Token token) {
		tokenDAO.save(token);
	}

	@Override
	public void updateToken(Token token) {
		tokenDAO.update(token);
	}

	@Override
	public Token findTokenByUserId(int id) {
		return tokenDAO.get("from Token where userid = ? and del=0", new Object[] { id });
	}


	@Override
	public void deleteToken(Token token) {
		tokenDAO.delete(token);
	}
	
	@Override
	public Token findToken(int userid, String token){
		return tokenDAO.get("from Token where userid = ? and token and del=0", new Object[] { userid, token });
		
	}

}
