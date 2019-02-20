package com.kg.cinema.admin;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.kg.cinema.movie.Moviebean;
import com.kg.cinema.notice.Noticebean;
@Repository
@Component
public class AdminDAO {
	
	//org.mybatis.spring.SqlSessionTemplate
		@Autowired
		SqlSessionTemplate temp;
	
	//notice
	public void NoticeInsert(Noticebean ndto) {
		temp.insert("admin.noticeInsert", ndto);
	}//end
	public void NoticeDelete(int data) {
		 temp.delete("admin.noticeDelete", data);
	}//end
	public void NoticeEdit(Noticebean ndto) {
		temp.update("admin.noticeEdit",ndto);
	}//end
	
	//movie
	public void MovieInsert(Moviebean mdto) {
		temp.insert("admin.movieInsert", mdto);
	}//end
	public void MovieDelete(int data) {
		 temp.delete("admin.movieDelete", data);
	}//end
	public void MovieEdit(Moviebean mdto) {
		temp.update("admin.movieEdit",mdto);
	}//end
	
}
