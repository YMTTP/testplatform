package com.ymt.testplatform.service.token;


import com.ymt.testplatform.entity.Token;

public interface TokenService {

	public void saveToken(Token token);

	public void updateToken(Token token);

	public Token findTokenByUserId(int id);

	public void deleteToken(Token token);
	
	public Token findToken(int userid, String token);
}
