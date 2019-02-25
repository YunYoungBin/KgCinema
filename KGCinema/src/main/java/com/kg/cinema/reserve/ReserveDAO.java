package com.kg.cinema.reserve;

import java.text.SimpleDateFormat;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Repository
@Component
public class ReserveDAO {
	
	//org.mybatis.spring.SqlSessionTemplate
	@Autowired
	SqlSessionTemplate temp;
	
	public List<Reservebean> reserveSelect(String r_theater, String r_scrno, java.util.Date r_start) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		Reservebean bean = new Reservebean();
		bean.setR_theater(r_theater);
		bean.setR_scrno(r_scrno);
		bean.setDate(sdf.format(r_start));
		List<Reservebean> list = temp.selectList("reserve.select", bean);
		return list;
	}
	
	/*
	public Schedulebean scheduleDetail(int idx) {
		return temp.selectOne("schedule.detail", idx);
	}
	*/

}