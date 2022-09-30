package com.devsuperior.movieflix.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotEmpty;

import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;

public class MovieReviewDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;

	@NotEmpty
	private String title;

	@NotEmpty
	private String subTitle;

	@NotEmpty
	private String synopsis;

	@NotEmpty
	private String imgUrl;

	@NotEmpty
	private Integer year;

	private List<ReviewDTO> reviews = new ArrayList<>();

	public MovieReviewDTO(Long id, String title, String subTitle, String synopsis, String imgUrl, Integer year) {
		this.id = id;
		this.title = title;
		this.subTitle = subTitle;
		this.synopsis = synopsis;
		this.imgUrl = imgUrl;
		this.year = year;
	}

	public MovieReviewDTO(Movie entity) {
		id = entity.getId();
		title = entity.getTitle();
		subTitle = entity.getSubTitle();
		synopsis = entity.getSynopsis();
		imgUrl = entity.getImgUrl();
		year = entity.getYear();

		for (Review review : entity.getReviews()) {
			this.reviews.add(new ReviewDTO(review));
		}
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSubTitle() {
		return subTitle;
	}

	public void setSubTitle(String subTitle) {
		this.subTitle = subTitle;
	}

	public String getSynopsis() {
		return synopsis;
	}

	public void setSynopsis(String synopsis) {
		this.synopsis = synopsis;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public List<ReviewDTO> getReviews() {
		return reviews;
	}
}
