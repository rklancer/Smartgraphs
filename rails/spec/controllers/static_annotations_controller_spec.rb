require 'spec_helper'

describe StaticAnnotationsController do

  def mock_static_annotation(stubs={})
    @mock_static_annotation ||= mock_model(StaticAnnotation, stubs)
  end

  describe "GET index" do
    it "assigns all static_annotations as @static_annotations" do
      StaticAnnotation.stub(:find).with(:all).and_return([mock_static_annotation])
      get :index
      assigns[:static_annotations].should == [mock_static_annotation]
    end
  end

  describe "GET show" do
    it "assigns the requested static_annotation as @static_annotation" do
      StaticAnnotation.stub(:find).with("37").and_return(mock_static_annotation)
      get :show, :id => "37"
      assigns[:static_annotation].should equal(mock_static_annotation)
    end
  end

  describe "GET new" do
    it "assigns a new static_annotation as @static_annotation" do
      StaticAnnotation.stub(:new).and_return(mock_static_annotation)
      get :new
      assigns[:static_annotation].should equal(mock_static_annotation)
    end
  end

  describe "GET edit" do
    it "assigns the requested static_annotation as @static_annotation" do
      StaticAnnotation.stub(:find).with("37").and_return(mock_static_annotation)
      get :edit, :id => "37"
      assigns[:static_annotation].should equal(mock_static_annotation)
    end
  end

  describe "POST create" do

    describe "with valid params" do
      it "assigns a newly created static_annotation as @static_annotation" do
        StaticAnnotation.stub(:new).with({'these' => 'params'}).and_return(mock_static_annotation(:save => true))
        post :create, :static_annotation => {:these => 'params'}
        assigns[:static_annotation].should equal(mock_static_annotation)
      end

      it "redirects to the created static_annotation" do
        StaticAnnotation.stub(:new).and_return(mock_static_annotation(:save => true))
        post :create, :static_annotation => {}
        response.should redirect_to(static_annotation_url(mock_static_annotation))
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved static_annotation as @static_annotation" do
        StaticAnnotation.stub(:new).with({'these' => 'params'}).and_return(mock_static_annotation(:save => false))
        post :create, :static_annotation => {:these => 'params'}
        assigns[:static_annotation].should equal(mock_static_annotation)
      end

      it "re-renders the 'new' template" do
        StaticAnnotation.stub(:new).and_return(mock_static_annotation(:save => false))
        post :create, :static_annotation => {}
        response.should render_template('new')
      end
    end

  end

  describe "PUT update" do

    describe "with valid params" do
      it "updates the requested static_annotation" do
        StaticAnnotation.should_receive(:find).with("37").and_return(mock_static_annotation)
        mock_static_annotation.should_receive(:update_attributes).with({'these' => 'params'})
        put :update, :id => "37", :static_annotation => {:these => 'params'}
      end

      it "assigns the requested static_annotation as @static_annotation" do
        StaticAnnotation.stub(:find).and_return(mock_static_annotation(:update_attributes => true))
        put :update, :id => "1"
        assigns[:static_annotation].should equal(mock_static_annotation)
      end

      it "redirects to the static_annotation" do
        StaticAnnotation.stub(:find).and_return(mock_static_annotation(:update_attributes => true))
        put :update, :id => "1"
        response.should redirect_to(static_annotation_url(mock_static_annotation))
      end
    end

    describe "with invalid params" do
      it "updates the requested static_annotation" do
        StaticAnnotation.should_receive(:find).with("37").and_return(mock_static_annotation)
        mock_static_annotation.should_receive(:update_attributes).with({'these' => 'params'})
        put :update, :id => "37", :static_annotation => {:these => 'params'}
      end

      it "assigns the static_annotation as @static_annotation" do
        StaticAnnotation.stub(:find).and_return(mock_static_annotation(:update_attributes => false))
        put :update, :id => "1"
        assigns[:static_annotation].should equal(mock_static_annotation)
      end

      it "re-renders the 'edit' template" do
        StaticAnnotation.stub(:find).and_return(mock_static_annotation(:update_attributes => false))
        put :update, :id => "1"
        response.should render_template('edit')
      end
    end

  end

  describe "DELETE destroy" do
    it "destroys the requested static_annotation" do
      StaticAnnotation.should_receive(:find).with("37").and_return(mock_static_annotation)
      mock_static_annotation.should_receive(:destroy)
      delete :destroy, :id => "37"
    end

    it "redirects to the static_annotations list" do
      StaticAnnotation.stub(:find).and_return(mock_static_annotation(:destroy => true))
      delete :destroy, :id => "1"
      response.should redirect_to(static_annotations_url)
    end
  end

end
